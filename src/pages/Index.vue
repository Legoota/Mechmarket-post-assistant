<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col" style="padding-right: .75em">
        <q-card
          class="my-card"
        >
          <q-card-section>
            <div class="text-h6">Editor</div>
          </q-card-section>

          <q-separator inset /> <br/>

          <q-card-section class="q-pt-none">
            <div class="text-subtitle1 text-weight-bold">Title of post</div>
            <div class="text-subtitle2">Country</div>
            <div class="row">
              <div class="col">
                <q-select
                  filled
                  v-model="country"
                  :options="region"
                  label="Select"
                />
              </div>
              <div class="col-1"></div>
              <div class="col">
                <q-select v-if="detailRegion.length > 0"
                  filled
                  v-model="location"
                  :options="detailRegion"
                  label="Select"
                />
                <q-input v-else-if="country.length > 0"
                  debounce="400"
                  mask="AA"
                  filled
                  v-model="location"
                  label="Country 2-letter code"
                />
              </div>
            </div>
            <br/><br/>
            <div class="text-subtitle2">What you have</div>
            <q-input
              debounce="400"
              filled
              v-model="haves"
              label="Type here what you have..."
            />
            <q-checkbox v-model="haveChecked" label="Paypal" val="Paypal" />
            <q-checkbox v-model="haveChecked" label="Local cash" val="Local cash" />
            <q-checkbox v-model="haveChecked" label="Artisans" val="Artisans" />
            <br/><br/>
            <div class="text-subtitle2">What you want</div>
            <q-input
              debounce="400"
              filled
              v-model="wants"
              label="Type here what you want..."
            />
            <q-checkbox v-model="wantChecked" label="Paypal" val="Paypal" />
            <q-checkbox v-model="wantChecked" label="Local cash" val="Local cash" />
            <q-checkbox v-model="wantChecked" label="Artisans" val="Artisans" />
          </q-card-section>

          <q-separator inset /> <br/>

          <q-card-section class="q-pt-none">
            <div class="text-subtitle1 text-weight-bold">Body of post</div>
            <div class="text-subtitle2">Timestamp link</div>
            <div class="row">
              <div class="col">
                <q-input
                  filled
                  :disable="noTimestamp"
                  debounce="400"
                  v-model="timestamp"
                  label="Paste timestamp link..."
                />
              </div>
              <div class="col">
                <q-checkbox v-model="noTimestamp" label="No timestamp"/>
              </div>
            </div>
            <br/>
            <div class="text-subtitle2">Editor</div>
            <q-editor v-model="editor"
            :toolbar="[
              ['bold', 'italic'],
              [{
                label: $q.lang.editor.formatting,
                icon: $q.iconSet.editor.formatting,
                list: 'no-icons',
                options: ['p', 'h3', 'h4', 'h5']
              }],
              ['quote', 'unordered', 'ordered'],
            ]"/>
            <br/>
            <div class="text-subtitle2">Usual options</div>
            <q-checkbox v-model="commentWhenPm" label="Comment when PMing"/>
            <q-checkbox v-model="chat" label="No Reddit Chat"/>
            <q-checkbox v-model="proxy" label="Proxy available"/>
            <q-checkbox v-if="regionOnly().length > 0" v-model="regionLock" :label="regionOnly()"/>
            <br/>
          </q-card-section>
        </q-card>
      </div>
      <div class="col" style="padding-left: .75em">
        <q-card
          class="my-card"
        >
          <q-card-section>
            <div class="text-h6">Reddit-ready</div>
          </q-card-section>

          <q-separator inset /> <br/>

          <q-card-section class="q-pt-none">
            <div class="text-subtitle1 text-weight-bold">Title of post
              <q-btn :disable="location.length < 1" round size="xs" @click="copyTitle()" color="info" icon="content_copy" />
            </div> <br/>
            <code class="postPart">
[{{countryDisp()}}] [H] {{haveDisp()}} [W] {{wantDisp()}}
            </code>
          </q-card-section>

          <q-separator inset /> <br/>

          <q-card-section class="q-pt-none">
            <div class="text-subtitle1 text-weight-bold">Body of post
              <q-btn round size="xs" @click="copyPost()" color="info" icon="content_copy" />
            </div>
<pre class="postPart" v-if="timestamp && !noTimestamp">
<code>[Timestamp]({{timestamp}}){{newLineTrailingSpaces()}}</code>
{{randomGreet+'!'+newLineTrailingSpaces()}}
{{newLineTrailingSpaces()}}
{{markdowntext}}
{{newLineTrailingSpaces()}}
{{options()+newLineTrailingSpaces()}}
{{randomFarewell+'!'}}
</pre>
<pre class="postPart" v-else>
{{randomGreet+'!'+newLineTrailingSpaces()}}
{{newLineTrailingSpaces()}}
{{markdowntext}}
{{newLineTrailingSpaces()}}
{{options()+newLineTrailingSpaces()}}
{{randomFarewell+'!'}}
</pre>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.body--light .postPart {
  background-color: #f2f2f2;
  padding: .4em;
  border-radius: .4em;
}

.body--dark .postPart {
  background-color: #2d2d2d;
  padding: .4em;
  border-radius: .4em;
}
</style>

<script>
import { usa, canada } from '../assets/regions'
import { greetings, farewells } from '../assets/politeness'
import { copyToClipboard } from 'quasar'
const TurndownService = require('turndown').default
var tds = new TurndownService()

const regions = ['CA', 'EU', 'US', 'Rest of world']

export default {
  name: 'PageIndex',
  data () {
    return {
      region: regions,
      detailRegion: [],
      country: '',
      location: '',
      haves: '',
      wants: '',
      haveChecked: [],
      wantChecked: [],
      timestamp: null,
      noTimestamp: false,
      editor: '',
      chat: false,
      commentWhenPm: false,
      regionLock: false,
      proxy: false,
      markdowntext: ''
    }
  },
  watch: {
    country (n) {
      this.location = ''
      if (n === 'CA') this.detailRegion = canada
      else if (n === 'US') this.detailRegion = usa
      else this.detailRegion = []
    },
    editor (n) {
      this.markdowntext = tds.turndown(n)
    }
  },
  computed: {
    randomGreet () {
      return greetings[Math.floor(Math.random() * greetings.length)]
    },
    randomFarewell () {
      return farewells[Math.floor(Math.random() * farewells.length)]
    }
  },
  methods: {
    countryDisp () {
      if (this.country.length === 0 || this.location.length === 0) return '-'
      if (this.country === 'Rest of world') return this.location
      else return this.country + '-' + this.location
    },
    haveDisp () {
      if (this.haves.length === 0 && this.haveChecked.length === 0) return '-'
      else if (this.haves.length > 0 && this.haveChecked.length === 0) return this.haves
      else if (this.haves.length === 0 && this.haveChecked.length > 0) return this.haveChecked.join(', ')
      else return this.haves + ', ' + this.haveChecked.join(', ')
    },
    wantDisp () {
      if (this.wants.length === 0 && this.wantChecked.length === 0) return '-'
      else if (this.wants.length > 0 && this.wantChecked.length === 0) return this.wants
      else if (this.wants.length === 0 && this.wantChecked.length > 0) return this.wantChecked.join(', ')
      else return this.wants + ', ' + this.wantChecked.join(', ')
    },
    copyTitle () {
      copyToClipboard('[' + this.countryDisp() + '] [H] ' + this.haveDisp() + ' [W] ' + this.wantDisp())
        .then(() => {
          this.$q.notify({
            message: 'Copied to clipboard',
            color: 'positive'
          })
        })
        .catch(() => {
          this.$q.notify({
            message: 'Failed to copy to clipboard',
            color: 'negative'
          })
        })
    },
    copyPost () {
      copyToClipboard('//TODO')
        .then(() => {
          this.$q.notify({
            message: 'Copied to clipboard',
            color: 'positive'
          })
        })
        .catch(() => {
          this.$q.notify({
            message: 'Failed to copy to clipboard',
            color: 'negative'
          })
        })
    },
    newLineTrailingSpaces () {
      return '  '
    },
    regionOnly () {
      if (this.country === 'EU') return 'EU Only'
      else if (this.country === 'CA' || this.country === 'US') return 'Canada/CONUS Only.'
      else return ''
    },
    options () {
      var res = ''
      if (this.commentWhenPm) res += 'Please comment when you PM me. '
      if (this.chat) res += 'Avoid using Reddit chat. '
      if (this.regionLock) res += this.regionOnly() + ' '
      if (this.proxy) res += 'Proxy available. '

      return res
    }
  }
}
</script>
