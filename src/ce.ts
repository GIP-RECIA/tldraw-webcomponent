import Editor from './components/Editor';
import r2wc from '@r2wc/react-to-web-component';

customElements.define(
  'tldraw-editor',
  r2wc(Editor, {
    props: {
      idbName: 'string',
      uploadApi: 'string',
      wsUrl: 'string',
      userApi: 'string',
      nextcloudUrl: 'string',
      roomId: 'string',
      language: 'string',
      readOnly: 'boolean',
      noJoin: 'boolean',
      noLeave: 'boolean',
      noShare: 'boolean',
    },
  }),
);
