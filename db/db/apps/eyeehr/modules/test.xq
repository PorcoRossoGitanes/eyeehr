xquery version "3.0";

import module namespace eyeehr-note="eyeehr-note" at "./eyeehr-note.xq";

let $collection := '/db/apps/eyeehr/data/Note/patient-to-9999/patient-1/'
return eyeehr-note:get-note-list($collection)

op:numeric-add(1, 3)