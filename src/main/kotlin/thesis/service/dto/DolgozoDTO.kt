package thesis.service.dto

import thesis.entities.Beosztas
import thesis.entities.Telephely
import java.time.LocalDate
import javax.persistence.*

data class DolgozoDTO(var id: Long?,
                      var vezetekNev: String?,
                      var keresztkNev: String?,
                      var beosztas: Beosztas?,
                      var telephely: Telephely?,
                      var lakhely: String?,
                      var iranyitoSzam: Int?,
                      var cim: String?,
                      var telefonSzam: String?,
                      var fizetes: Long?,
                      var szulIdo: LocalDate?,
                      var munkaViszonyKezdete: LocalDate?) {
    constructor() : this(null, null, null, null, null, null, null, null, null, null, null,
        null)
}
