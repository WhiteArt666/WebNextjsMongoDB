import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  typescript: true,
})

export async function POST(req: NextRequest) {
    try {
      const rawBody = await req.text()
      const signature = req.headers.get("Stripe-Signature") as string
  
      const event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      )
  
      if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session
  
        const customerInfo = {
          clerkId: session?.client_reference_id,
          name: session?.customer_details?.name,
          email: session?.customer_details?.email,
        }
  
        const shippingAddress = {
          street: session?.shipping_details?.address?.line1,
          city: session?.shipping_details?.address?.city,
          state: session?.shipping_details?.address?.state,
          postalCode: session?.shipping_details?.address?.postal_code,
          country: session?.shipping_details?.address?.country,
        }
  
        const retrieveSession = await stripe.checkout.sessions.retrieve(
          session.id,
          { expand: ["line_items.data.price.product"]}
        )
  
        const lineItems = retrieveSession.line_items?.data
  
        const orderItems = lineItems?.map((item) => {
          const priceProduct = item.price?.product as Stripe.Product
          return {
            product: priceProduct.metadata.productId,
            color: priceProduct.metadata.color || "N/A",
            size: priceProduct.metadata.size || "N/A",
            quantity: item.quantity,
          }
        }) || []
  
        await connectToDB()
  
        const newOrder = new Order({
          customerClerkId: customerInfo.clerkId,
          products: orderItems,
          shippingAddress,
          shippingRate: session?.shipping_cost?.shipping_rate,
          totalAmount: session.amount_total ? session.amount_total / 100 : 0,
        })
  
        await newOrder.save()
  
        let customer = await Customer.findOne({ clerkId: customerInfo.clerkId })
  
        if (customer) {
          customer.orders.push(newOrder._id)
        } else {
          customer = new Customer({
            ...customerInfo,
            orders: [newOrder._id],
          })
        }
  
        await customer.save()
      }
  
      return NextResponse.json({ message: "Order created" }, { status: 200 })
    } catch (err) {
      console.log("[webhooks_POST]", err)
      return NextResponse.json({ message: "Failed to create the order" }, { status: 500 })
    }
}

// Remove or comment out the export of `stripe` if not needed elsewhere
export const dynamic = 'force-dynamic'