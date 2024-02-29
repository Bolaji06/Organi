"use client";

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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useContext } from "react";

interface IDialog {
  action: () => void;
  title: string;
  description: string;
}

//This action cannot be undone. This will permanently
// remove all items from your cart.

export function AlertDialogPopOver({ action, title, description }: IDialog) {
  //const { clearCart } = useContext(CartContext);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-transparent text-primary hover:underline">
          Clear all
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => action()} className="bg-red-600">
            Clear all
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
