import { css } from '@emotion/core'
import styled from '@emotion/styled'

const Wrap = styled.div`
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Fira Sans', sans-serif;
`

const H2 = styled.h2`
  font-size: 50px;
  line-height: 1.25;
  color: rgba(255, 255, 255, 0.85);
  text-shadow: 0 5px 50px rgba(0, 0, 0, 0.3);
`

const Published = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
`

const P = styled.p`
  font-size: 24px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.65);
`

const Hero = styled.div`
  position: relative;
  display: flex;
  padding: 40px 0;
  margin-bottom: 100px;

  ::before {
    content: '';
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url(https://source.unsplash.com/SBNQ_V6Pt08/1600x900);
    background-size: cover;
    transform: translateY(-15%) skewY(-3deg) scaleY(1.2);
    transform-origin: bottom right;
    z-index: -1;
    filter: brightness(50%);
  }
`

const Photo = styled.img`
  float: right;
  margin-right: -60px;
  shape-outside: polygon(
    11% 22%,
    82% 10%,
    93% 17%,
    93% 77%,
    68% 85%,
    20% 92%,
    13% 85%
  );
  width: 300px;
  padding: 20px;
`

export default () => (
  <>
    <Hero>
      <Wrap>
        <H2>
          Halboffene im zueinander du grundstuck verstehsts schuchtern
          vertreiben mi
        </H2>
        <Published>
          Veröffentlicht <time dateTime>Mar 12 2019</time>
        </Published>
      </Wrap>
    </Hero>
    <Wrap>
      <P>
        Schlafer gelandes entgegen lampchen mi stabelle du ab gefallts. Den gebe
        der das ihre gewi uben eile kinn war. Spruche flecken wir zwingen gib
        familie mag tadelte. Schlafen sei verlohnt das all getraumt verstand auf
        bezahlen. Bodenlosen ordentlich eigentlich verschwand oha uhr vor. Gru
        vor gebracht gemessen heimelig was trillern neu schlecht. Kleinen em
        melodie zu so braunen je bruchig. Gescheite zerfasert gut stuckchen
        geblendet rausperte fur.
      </P>
      <P>
        Geh mitreden das tur manchmal wunschte feinsten schlafen. Ehe viel hof
        ruth wies warf graf seit. Aber oder je eben da vier in ri sies. Im alte
        roch bi sa gott gewu. Polemisch stuckchen zuschauen mi wu gestrigen
        ausdenken ei nachgehen. Grunen so schien ob fremde er em. Hatte nie bis
        danke klein jetzt hause wir dabei.
      </P>
      <Photo src='https://s3.eu-west-2.amazonaws.com/bassy-misc/olena-sergienko-1398945-unsplash.png' />
      <P>
        Eine arme ihm also tat zum dank hut furs. Madchens brannten nur auf
        gerberei man heiraten hindurch. Langsam ihr schlank wandern gar mag
        melodie. Bis ist nur vom herein heftig bilder. Herkommen anzeichen bis
        vor ernsthaft ein argerlich meisterin. Wurden spater uns liegen bin ein
        des spital. Unbemerkt ernstlich nebendran lohgruben unendlich aufraumen
        ich ton.
      </P>
      <P>
        Konnten klopfte fischen im so en. Marktplatz nachtessen ab zu te mi
        sonderling. Buch hat haus ans uben des. Unendlich um geschickt klimperte
        betrubtes du. Ihrem kerze abend sah sogar statt hab faden. Stadtchen
        verweilen geheimnis da vergesset pa sudwesten zu. Wu ists la neue auch
        du. Ein lieber deinen ordnen brauen ton katzen ruhmte.
      </P>
      <P>
        Bosheit nachher am hubsche beschlo wo wo dankbar. Holen zwirn ob in
        kraft pa. Eine weit te la ob la hell. Wo sparlich la im kraftlos je
        gebogene. Er vorpfeifen kuchenture ubelnehmen kartoffeln in freundlich
        ja an. Dem gut groben ihn zopfen wie sauber werdet fallen.
      </P>
      <P>
        Gehen sehet blies alles la da in litze. Nein wie lie also ganz. Bis
        gegenteil sudwesten studieren den aufstehen hochstens. Warf in am te
        orte nest gern. Du wohnstube da kellnerin vogelnest se so. Stunden
        gewogen zur ruh sonntag hof woruber ahnlich mageren. Glatten horchte
        dichten zu la namlich um schonen se eleganz.
      </P>
      <P>
        Also zu sage so ding. Ihm nah ordnung gewogen fenster oha stopfen
        bosheit mir dunklen. Ein die erstaunen verharrte rausperte nun
        stuckchen. Zu du schon zwirn trost. Harmlos fremder man dunklen mir neu
        all. Stadt er davon klare naher ahren im.
      </P>
      <P>
        Lampchen ziemlich bat als bei feinheit eberhard abraumen. Eia spruche
        tadelte ruh flecken der drunten. Gerechte madchens fraulein kam schlafet
        heiraten ich. Vorbeugte bedeckten gewandert pa es um barbieren ernstlich
        verlassen. Fu la gewachsen abstellte spurenden liebhaben schwarzes
        schnellen. Zuliebe abwarts am he schaute beinahe gewogen. Kleide wir weg
        starke beiden. Plotzlich so mu am naturlich gepfiffen. Ein lie gewi ein
        denk ware. Pa saubere es gedeckt niemand endlich lockere stimmts.
      </P>
      <P>
        Denn tal fiel dem aber neu wie lang lich. An kleide ja ei erzahl sicher
        hinauf sohlen freund. Nachmittag abendsuppe feierabend gutmutigen er
        nachtessen mu launischen. Siehst gru ist machen grunde sieben dem zum
        person nieder. Schuchtern halboffene lehrlingen tag feierabend art
        vorpfeifen jahreszeit. Furchtete hemdarmel beneidest gepfiffen zu wo
        zuschauer ab ernstlich. Gutmutigen verstehsts hausdacher ers hut
        verbergend kam. Ich anzug las herrn sie empor sitte schau. Te also so
        tief ja frau in fand.
      </P>
    </Wrap>
  </>
)
