'use client'

import { CartContext } from "@/app/context/cartContext";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { useContext } from "react"

  
  export function AlertDialogPopOver() {
    const { clearCart } = useContext(CartContext);
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-transparent text-primary hover:underline">Clear all</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear Cart?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently 
              remove all items from your cart.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => clearCart()} className="bg-red-600">Clear all</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  