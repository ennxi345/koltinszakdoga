package thesis.service

import thesis.service.dto.MegyeDTO

interface MegyeService {

    fun getAll() : List<MegyeDTO>;
}
