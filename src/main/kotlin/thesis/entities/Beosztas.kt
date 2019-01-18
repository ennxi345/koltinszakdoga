package thesis.entities

import javax.persistence.*

@Entity
@Table(name = "beosztas")
data class Beosztas(
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    var id: Long?,
    @Column(name = "beosztas_nev", length = 50)
    var beosztasNev: String?) {

    constructor() : this(null, null)
}
