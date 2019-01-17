package thesis.entities

import javax.persistence.*

@Entity
@Table(name = "marka")
data class Marka(@Id
                 @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
                 @SequenceGenerator(name = "sequenceGenerator")
                 var id: Long?,
                 @Column(name = "nev", length = 100)
                 var nev: String?) {
    constructor() : this(null, null)
}
