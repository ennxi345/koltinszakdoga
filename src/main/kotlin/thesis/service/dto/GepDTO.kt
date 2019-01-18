package thesis.service.dto

import thesis.entities.GepTipus
import thesis.entities.Marka
import thesis.entities.Telephely
import java.time.LocalDate

data class GepDTO(var id: Long?,
                  var nev: String?,
                  var marka: Marka?,
                  var gepTipus: GepTipus?,
                  var telephely: Telephely?,
                  var suly: Int?,
                  var gyartas_eve: Int?,
                  var uzemIdo: Int?,
                  var cegTulajdona: LocalDate?) {
    constructor() : this(null,null,null,null,null,null,null,null,null)
}
