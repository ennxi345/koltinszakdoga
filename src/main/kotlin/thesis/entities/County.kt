package thesis.entities

import javax.persistence.*
import javax.validation.constraints.Size

@Entity
@Table(name = "county")
data class County(
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    var id: Long?,
    @Column(name = "county_name", length = 50)
    var countyName: String?) {


    constructor() : this(null, null)

}
