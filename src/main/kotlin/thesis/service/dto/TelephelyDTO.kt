package thesis.service.dto

data class TelephelyDTO(var id: Long?, var megye: MegyeDTO?, var telepules: String?, var iranyitoSzam: String?, var cim: String?, var telefonSzam: String?, var email: String?)  {

    constructor() : this(null, null, null, null, null, null, null)
}
