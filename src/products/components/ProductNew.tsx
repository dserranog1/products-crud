import {
  ProductCreatePayload,
  ProductUpdatePayload,
  createProduct,
} from "@/api/products";
import { Button } from "@/components/ui/button";
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
import { useToast } from "@/components/ui/use-toast";
import { Categories, Product } from "@/types";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { enumToId } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  title: z.string().min(1, { message: "Required field" }),
  price: z.number().positive({ message: "Number must be positive" }),
  description: z.string().min(1, { message: "Required field" }),
  category: z.nativeEnum(Categories),
  first_image: z.string().url(),
  second_image: z.string().url().optional(),
  third_image: z.string().url().optional(),
});

type FormData = z.infer<typeof formSchema>;

const ProductNew = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: Categories.clothes,
      price: 100,
      first_image: "",
      second_image: "",
      third_image: "",
    },
  });
  const createProductMutation = useMutation({
    mutationFn: (newProductData: ProductUpdatePayload) => {
      return createProduct(newProductData);
    },
    onSuccess: (newProduct: Product) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: `Product creation successful`,
      });
      navigate(`/products/${newProduct.id}`);
    },
    onError: (error) => {
      // TODO parse response error and set more meaningful errors
      toast({
        title: "An error has ocurred while creating the product",
        description: `Contact support if error persists`,
        variant: "destructive",
      });
      console.log({ error });
    },
  });
  const onSubmit = (values: FormData) => {
    console.log(values);
    const images = [];
    if (values.first_image) {
      images.push(values.first_image);
    }
    if (values.second_image) {
      images.push(values.second_image);
    }
    if (values.third_image) {
      images.push(values.third_image);
    }
    const payload: ProductCreatePayload = {
      title: values.title,
      description: values.description,
      price: values.price,
      categoryId: enumToId(values.category),
      images,
    };
    createProductMutation.mutate(payload, {
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
                    <SelectValue placeholder="Seleccione una" />
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
        <FormField
          control={form.control}
          name="first_image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image *</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="second_image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image two</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="third_image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image three</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {createProductMutation.isPending ? (
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
              Create
            </Button>
            {/* </AlertDialogCancel> */}
          </>
        )}
      </form>
    </Form>
  );
};

export default ProductNew;
