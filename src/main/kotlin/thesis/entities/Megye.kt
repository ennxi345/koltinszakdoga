package thesis.entities

import javax.persistence.*
import javax.validation.constraints.Size

@Entity
@Table(name = "megye")
data class Megye(
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    var id: Long?,
    @Column(name = "megye_nev", length = 50)
    var megyeNev: String?) {


    constructor() : this(null, null)

}
