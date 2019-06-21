import { assign } from 'xstate';

const assignEventData = key =>
    assign({ [key]: (context, event) => event.data });

export default assignEventData;
