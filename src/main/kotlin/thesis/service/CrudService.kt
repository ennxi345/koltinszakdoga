package thesis.service

import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable

interface CrudService<D, C, E> {
    fun getAll(): List<D>

    fun query(criteria: C, pageable: Pageable): Page<D>

    fun getById(id: Long): D

    fun save(dto: D): D

    fun deleteById(id: Long)

    fun deleteAll()
}
