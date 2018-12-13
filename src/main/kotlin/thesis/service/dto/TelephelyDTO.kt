package thesis.service.dto

import java.time.LocalDate

data class TelephelyDTO(var id: Long?, var nev: String?, var megye: MegyeDTO?, var telepules: String?, var iranyitoSzam: String?, var cim: String?, var telefonSzam: String?, var email: String?,
                        var fax: String?, var mukodesKezdete: LocalDate? )  {

    constructor() : this(null, null, null, null, null, null, null, null, null,null)
}
