package thesis.service

import thesis.service.dto.CountyDTO

interface CountyService {

    fun getAll() : List<CountyDTO>;
}
