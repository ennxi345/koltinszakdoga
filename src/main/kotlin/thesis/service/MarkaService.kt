package thesis.service

import thesis.service.dto.MarkaDTO

interface MarkaService {
    fun getAll(): List<MarkaDTO>
}
