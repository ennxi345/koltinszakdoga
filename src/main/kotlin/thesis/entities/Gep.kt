package thesis.entities

import java.time.LocalDate
import javax.persistence.*

@Entity
@Table(name = "gep")
data class Gep(@Id
               @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
               @SequenceGenerator(name = "sequenceGenerator")
               var id: Long?,
               @Column(name = "nev", length = 200)
               var nev: String?,
               @JoinColumn(name = "marka_id")
               @ManyToOne(fetch = FetchType.LAZY)
               var marka: Marka?,
               @JoinColumn(name = "geptipus_id")
               @ManyToOne(fetch = FetchType.LAZY)
               var gepTipus: GepTipus?,
               @JoinColumn(name = "telephely_id")
               @ManyToOne(fetch = FetchType.LAZY)
               var telephely: Telephely?,
               @Column(name = "suly")
               var suly: Int?,
               @Column(name = "gyartas_eve")
               var gyartasEve: Int?,
               @Column(name = "uzemido")
               var uzemIdo: Int?,
               @Column(name = "ceg_tulajdona")
               var cegTulajdona: LocalDate?) {
    constructor() : this(null, null, null, null, null, null, null, null, null)
}
