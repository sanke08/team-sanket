"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { signIn, useSession } from "next-auth/react";
import Image from 'next/image'
import Link from 'next/link'



const page = () => {
  // const { data: session } = useSession();
  return (
    <main>
      <div className="flex gap-5 justify-between items-center px-7 py-1 font-bold border-b border-solid border-zinc-100 leading-[154.5%] max-md:flex-wrap max-md:px-5">
        <div className="flex gap-1.5 justify-center self-stretch my-auto text-2xl tracking-tighter text-neutral-700">
          <Image
            src="/images/logo.png"
            alt="LOGO"
            sizes="100vw"
            className=" w-28"

            width={0}
            height={0}
          />
        </div>
        <ul className="gap-5 justify-between self-stretch my-auto text-sm leading-5 text-neutral-700 max-md:flex-wrap max-md:max-w-full font-normal hidden md:flex">
          <li>Home</li>
          <li>Pricing</li>
          <li>News Room</li>
          <li>Features</li>
          <li>Contact us</li>
        </ul>
        <Link
          href="/dashboard"
          className="bg-orange px-4 py-2 rounded-sm text-white"
        >
          Free Trial
        </Link>
      </div>
      <section>
        <div className="flex items-center justify-center flex-col mt-[80px] gap-4 ">
          <span className="text-orange bg-orange/20 px-4 py-2 rounded-full text-sm">
            An AI powered sales assistant chatbot
          </span>
          <Image
            src="/images/corinna-ai-logo.png"
            width={500}
            height={100}
            alt="Logo"
            className="max-w-lg object-contain"
          />
          <p className="text-center max-w-[500px]">
            Your AI powered sales assistant! Embed Corinna AI into any website
            with just a snippet of code!
          </p>
          <Button className="bg-orange font-bold text-white px-4">
            Start For Free
          </Button>
          <Image
            src="/images/iphonecorinna.png"
            width={400}
            height={100}
            alt="Logo"
            className="max-w-lg object-contain"
          />
        </div>
      </section>
      <section className="flex justify-center items-center flex-col gap-4 mt-10">
        <h2 className="text-4xl text-center"> Choose what fits you right</h2>
        <p className="text-muted-foreground text-center max-w-lg">
          Our straightforward pricing plans are tailored to meet your needs. If
          {" you're"} not ready to commit you can get started for free.
        </p>
      </section>
      <div className="flex  justify-center gap-4 flex-wrap mt-6">
        {pricingCards.map((card) => (
          <Card
            key={card.title}
            className={cn('w-[300px] flex flex-col justify-between', {
              'border-2 border-primary': card.title === 'Unlimited',
            })}
          >
            <CardHeader>
              <CardTitle className="text-orange">{card.title}</CardTitle>
              <CardDescription>
                {pricingCards.find((c) => c.title === card.title)?.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-4xl font-bold">{card.price}</span>
              <span className="text-muted-foreground">
                <span>/ month</span>
              </span>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
              <div>
                {card.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex gap-2"
                  >
                    <Check />
                    <p>{feature}</p>
                  </div>
                ))}
              </div>
              <Button
                onClick={() => signIn("google")}
                className="bg-[#f3d299] border-orange border-2 p-2 w-full text-center font-bold rounded-md"
              >
                Get Started
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <section className="flex justify-center items-center flex-col gap-4 mt-28">
        <h2 className="text-4xl text-center">News Room</h2>
        <p className="text-muted-foreground text-center max-w-lg">
          Explore our insights on AI, technology, and optimizing your business.
        </p>
      </section>
    </main>

  )
}

export default page




export const pricingCards = [
  {
    title: 'Standard',
    description: 'Perfect for trying out Corinna AI',
    price: '$0',
    duration: '',
    highlight: 'Key features',
    features: [' 1 domain ', '10 contacts', '10 Emails per month'],
    priceId: '',
  },
  {
    title: 'Ultimate',
    description: 'The ultimate agency kit',
    price: '$97',
    duration: 'month',
    highlight: 'Key features',
    features: [' Unlimited domain ', '500 Contacts', '500 Emails'],

    priceId: 'price_1OYxkqFj9oKEERu1KfJGWxgN',
  },
  {
    title: 'Plus',
    description: 'For serious agency owners',
    price: '$67',
    duration: 'month',
    highlight: 'Everything in Starter, plus',
    features: [' 2 domain ', '50 contacts', '50 Emails per month'],
    priceId: 'price_1OYxkqFj9oKEERu1NbKUxXxN',
  },
]
