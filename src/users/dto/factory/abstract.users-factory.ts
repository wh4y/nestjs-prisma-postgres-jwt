import { AbstractFactory } from "../../../shared/factory/AbstractFactory";

export abstract class AbstractUsersFactory<T, M> extends AbstractFactory {
  abstract create(object?:T, schema?: M): Promise<M>;
}
