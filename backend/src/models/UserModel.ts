import { modelOptions, prop, getModelForClass, setGlobalOptions, Severity } from '@typegoose/typegoose';

setGlobalOptions({ options: { allowMixed: Severity.ALLOW } });
@modelOptions({ 
  options: { 
    allowMixed: Severity.ALLOW
  } 
})
export class User {
  public _id?: string;
  @prop({ required: true })
  public name!: string;
  @prop({ required: true, unique: true })
  public email!: string;
  @prop({ required: true })
  public password!: string;
  @prop({ required: true, default: false })
  public isAdmin!: boolean;
}

export const UserModel = getModelForClass(User);
