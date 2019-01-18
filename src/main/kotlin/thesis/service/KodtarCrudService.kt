package thesis.service

import thesis.service.dto.MarkaDTO

interface KodtarCrudService<D> {

    fun getAll(): List<D>
}
