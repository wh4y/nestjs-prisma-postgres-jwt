export abstract class AbstractUsersFactory<T, M> {
  abstract create(object?:T, schema?: M): Promise<M>;
}
