package thesis.entities

import java.time.LocalDate
import javax.persistence.*

@Entity
@Table(name = "telephely")
data class Telephely(
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    var id: Long?,
    @JoinColumn(name ="megye_id")
    @ManyToOne(fetch = FetchType.LAZY)
    var megye: Megye?,
    @Column(name = "telepules", length = 100)
    var telepules: String?,
    @Column(name = "iranyitoszam")
    var iranyitoSzam: Int?,
    @Column(name = "cim",length = 200)
    var cim: String?,
    @Column(name = "telefonszam",length = 50)
    var telefonszam: String?,
    @Column(name = "email",length = 100)
    var email: String?,
    @Column(name = "fax", length = 100)
    var fax: String?,
    @Column(name = "mukodes_kezdete")
    var mukodesKezdete: LocalDate?
    ){

    constructor() : this(null, null, null, null, null, null, null,null,null)

}
