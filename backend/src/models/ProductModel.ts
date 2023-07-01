import { modelOptions, prop, getModelForClass } from "@typegoose/typegoose";

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

@modelOptions({ schemaOptions: { timestamps: true } })
export class Product {
  public _id!: string;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true, unique: true })
  public slug!: string;

  @prop({ required: true })
  public image!: string;

  @prop()
  public images!: string[];

  @prop({ required: true })
  public description!: string;

  @prop({ required: true })
  public color!: string;

  @prop({ required: true, default: 0 })
  public price!: number;

  @prop({ required: true, default: { rate: 0, count: 0 } })
  public rating!: { rate: number; count: number };

  @prop({ required: true, default: sizes.map((size) => ({ size, count: 0 })) })
  public sizes!: { size: string; count: number }[];

  @prop({ required: true, default: false })
  public isFeatured!: boolean;

  @prop()
  public banner?: string;
}

export const ProductModel = getModelForClass(Product);
