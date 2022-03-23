export abstract class AbstractFactory<T, M> {
  abstract create(object?:T, schema?: M): M;
}
