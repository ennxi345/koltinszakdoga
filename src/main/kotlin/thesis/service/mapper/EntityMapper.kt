package thesis.service.mapper

interface EntityMapper<D, E> {
    abstract fun toEntity(dto: D): E

    abstract fun toDto(entity: E): D

    abstract fun toEntity(dtoList: List<D>): List<E>

    abstract fun toDto(entityList: List<E>): List<D>
}
