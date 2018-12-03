package thesis.entities

import javax.persistence.*
import javax.validation.constraints.Size

@Entity
@Table(name = "vehicle")
data class Vehicle(@Id
                   @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
                   @SequenceGenerator(name = "sequenceGenerator")
                   var id: Long?,
                   @Column(name = "license_number")
                   var licenseNumber: Long?,
                   @Column(name = "age")
                   var age: Int?, @Size(max = 50)
                   @Column(name = "brand", length = 50)
                   var brand: String?,
                   @Column(name = "owner", length = 100)
                   var owner: String?) {


    // Necessary for MapStruct
    constructor() : this(null, null, null, null, null)


    companion object {

        private const val serialVersionUID = 1L
    }
}
