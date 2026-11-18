import type { Text } from '../../types';
import p01 from './parts/es-6-lo-que-se-queda-01';
import p02 from './parts/es-6-lo-que-se-queda-02';
import p03 from './parts/es-6-lo-que-se-queda-03';
import p04 from './parts/es-6-lo-que-se-queda-04';
import p05 from './parts/es-6-lo-que-se-queda-05';
import p06 from './parts/es-6-lo-que-se-queda-06';
import p07 from './parts/es-6-lo-que-se-queda-07';
import p08 from './parts/es-6-lo-que-se-queda-08';
import p09 from './parts/es-6-lo-que-se-queda-09';
import p10 from './parts/es-6-lo-que-se-queda-10';
import p11 from './parts/es-6-lo-que-se-queda-11';
import p12 from './parts/es-6-lo-que-se-queda-12';
import p13 from './parts/es-6-lo-que-se-queda-13';
import p14 from './parts/es-6-lo-que-se-queda-14';
import p15 from './parts/es-6-lo-que-se-queda-15';

const text: Text = {
  id: 'es-6-lo-que-se-queda',
  lv: 6,
  kind: 'story',
  title: 'Lo que se queda',
  titleEn: 'What Remains',
  s: [...p01, ...p02, ...p03, ...p04, ...p05, ...p06, ...p07, ...p08, ...p09, ...p10, ...p11, ...p12, ...p13, ...p14, ...p15],
  q: [
    { q: "Why does Irene go to Fuentecilla at the start of the summer?", o: ["To spend her holidays with her grandmother", "To empty her late grandmother's house so that it can be sold", "To work in the olive harvest", "To design a hotel for an estate agency"], a: 1 },
    { q: "What does Irene find under the false bottom of the cutlery drawer?", o: ["Letters from Germany", "A photograph of her mother", "A notebook recording the olive grove's harvests since 1961", "The key to the attic"], a: 2 },
    { q: "Who is Rafa?", o: ["The estate agent from Jaén", "A man who has worked Carmen's olive grove with her for eight years, sharing the harvest", "Encarna's grandson", "The representative of Olivares del Sur"], a: 1 },
    { q: "What does Joaquín ask Carmen in the postscript of his last letter?", o: ["To come to his wedding", "To sell him the Hoya", "Not to leave his mother on her own", "To burn his letters"], a: 2 },
    { q: "Who was \"J.\" in Carmen's notebook, and what did Carmen do for her?", o: ["Joaquín, to whom she sent money in Germany", "Josefa, Joaquín's mother, to whom she gave money every December, saying it came from her son", "Encarna, who helped with the harvest", "A day labourer she paid every December"], a: 1 },
    { q: "What does Pilar find in the back cover of the notebook?", o: ["Carmen's will", "A letter Carmen wrote to her on her wedding day and never sent", "The money for the harvest", "A photo of Joaquín"], a: 1 },
    { q: "What did Joaquín do every December after receiving Carmen's last letter?", o: ["He travelled to Fuentecilla", "He sent money to the village", "He gave boxes of olive oil from Jaén to his neighbours and friends", "He wrote to Carmen"], a: 2 },
    { q: "What does Irene do at the very end of the story?", o: ["She sells the house", "She leaves for Madrid", "She winds the living-room clock, which starts running again", "She burns the notebook"], a: 2 },
  ],
};

export default text;
