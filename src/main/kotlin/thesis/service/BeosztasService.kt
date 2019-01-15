package thesis.service

import thesis.service.dto.BeosztasDTO

interface BeosztasService {

    fun getAll() : List<BeosztasDTO>;
}
