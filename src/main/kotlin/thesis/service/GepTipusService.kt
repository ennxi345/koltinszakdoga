package thesis.service

import thesis.service.dto.GepTipusDTO

interface GepTipusService {
    fun getAll() : List<GepTipusDTO>;
}
