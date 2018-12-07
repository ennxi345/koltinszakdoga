package thesis.service

import thesis.service.dto.TelephelyDTO

interface TelephelyService {

    fun getAll() : List<TelephelyDTO>

    fun getById(id: Long) : TelephelyDTO

    fun save(telephelyDTO: TelephelyDTO) : TelephelyDTO

    fun deleteById(id: Long)

    fun deleteAll()
}
