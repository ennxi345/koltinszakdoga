package thesis.service.dto

data class VehicleDTO(var id: Long?, var licenseNumber: Long?,var age: Int?,var brand: String?,var owner: String?) {

    constructor() : this(null, null, null, null,null)

    companion object {

        private const val serialVersionUID = 1L
    }
}
