import { randomUUID } from 'node:crypto';

export type CustomerProps = {
  id: string;
  fullName: string;
  phone: string;
  createdAt: Date;
};

type CreateCustomerProps = {
  fullName: string;
  phone: string;
};

export class Customer {
  private constructor(private readonly props: CustomerProps) {}

  public static create(input: CreateCustomerProps): Customer {
    const fullName = input.fullName.trim();
    const phone = input.phone.trim();

    if (fullName.length < 2) {
      throw new Error('El nombre del cliente es obligatorio.');
    }

    if (!/^\+?[1-9]\d{7,14}$/.test(phone)) {
      throw new Error('El teléfono del cliente no es válido.');
    }

    return new Customer({
      id: randomUUID(),
      fullName,
      phone,
      createdAt: new Date(),
    });
  }

  public static rehydrate(props: CustomerProps): Customer {
    return new Customer(props);
  }

  public get id(): string {
    return this.props.id;
  }

  public get fullName(): string {
    return this.props.fullName;
  }

  public get phone(): string {
    return this.props.phone;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
