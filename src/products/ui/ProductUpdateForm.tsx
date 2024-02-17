"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReloadIcon } from "@radix-ui/react-icons";
import { FC } from "react";
import { Categories, Product } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { ProductUpdatePayload, updateProduct } from "@/api/products";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { categoryIdToEnum, enumToId } from "@/lib/utils";


//FIXME: https://github.com/shadcn-ui/ui/issues/772

const formSchema = z.object({
  title: z.string().min(1, { message: "Required field" }),
  price: z.number().positive({ message: "Number must be positive" }),
  description: z.string().min(1, { message: "Required field" }),
  category: z.nativeEnum(Categories),
  first_image: z.string().url().optional(),
  second_image: z.string().url().optional(),
  third_image: z.string().url().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface Props {
  product: Product;
}

export const ProductUpdateForm: FC<Props> = ({ product }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: product.title,
      price: product.price,
      description: product.description,
      category: categoryIdToEnum(product.category.id),
    },
  });
  const updateProductMutation = useMutation({
    mutationFn: (newProductData: ProductUpdatePayload) => {
      return updateProduct(product.id, newProductData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: `Product update successful`,
      });
    },
    onError: (error) => {
      // TODO parse response error and set more meaningful errors
      toast({
        title: "Ha ocurrido un error actualizando el item",
        description: `Si el error persiste póngase en contacto con soporte`,
        variant: "destructive",
      });
      console.log({ error });
    },
  });
  const onSubmit = (values: FormData) => {
    console.log(values);
    const payload: ProductUpdatePayload = {
      title: values.title,
      description: values.description,
      price: values.price,
      categoryId: enumToId(values.category),
    };
    updateProductMutation.mutate(payload, {
      onSuccess: () => {
        // form.reset();
      },
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title *</FormLabel>
                <FormControl>
                  <Input placeholder="Product title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description *</FormLabel>
                <FormControl>
                  <Input placeholder="Product description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price *</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Price"
                  {...field}
                  onChange={(event) => field.onChange(+event.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select one" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={Categories.clothes}>
                    {Categories.clothes}
                  </SelectItem>
                  <SelectItem value={Categories.electronics}>
                    {Categories.electronics}
                  </SelectItem>
                  <SelectItem value={Categories.furniture}>
                    {Categories.furniture}
                  </SelectItem>
                  <SelectItem value={Categories.shoes}>
                    {Categories.shoes}
                  </SelectItem>
                  <SelectItem value={Categories.miscellaneous}>
                    {Categories.miscellaneous}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {updateProductMutation.isPending ? (
          <Button disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Procesando
          </Button>
        ) : (
          <>
            {/* <AlertDialogCancel asChild> */}
            <Button
              className="mb-4 bg-blue-300 hover:bg-blue-100"
              type="submit"
            >
              Update
            </Button>
            {/* </AlertDialogCancel> */}
          </>
        )}
      </form>
    </Form>
  );
};

export default ProductUpdateForm;
