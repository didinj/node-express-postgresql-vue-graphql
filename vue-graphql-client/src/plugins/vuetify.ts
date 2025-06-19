import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles'; // Ensure Vuetify base styles are loaded

const vuetify = createVuetify({
    components,
    directives,
});

export default vuetify;