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
            <br/>
            <div class="text-subtitle2">What you have</div>
            <q-input
              debounce="400"
              filled
              v-model="haves"
              label="Type here what you have..."
            />
            <q-checkbox v-model="haveChecked" label="Paypal" val="Paypal" />
            <q-checkbox v-model="haveChecked" label="Artisans" val="Artisans" />
            <br/>
            <div class="text-subtitle2">What you want</div>
            <q-input
              debounce="400"
              filled
              v-model="wants"
              label="Type here what you want..."
            />
            <q-checkbox v-model="wantChecked" label="Paypal" val="Paypal" />
            <q-checkbox v-model="wantChecked" label="Artisans" val="Artisans" />
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
              <q-btn round size="xs" @click="copyTitle()" color="info" icon="content_copy" />
            </div> <br/>
            <code class="postTitle">
[{{countryDisp()}}] [H] {{haveDisp()}} [W] {{wantDisp()}}
            </code>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.body--light .postTitle {
  background-color: #f2f2f2;
  padding: .4em;
  border-radius: .4em;
}

.body--dark .postTitle {
  background-color: #2d2d2d;
  padding: .4em;
  border-radius: .4em;
}
</style>

<script>
import { usa } from '../assets/region-usa'
import { canada } from '../assets/region-canada'
import { copyToClipboard } from 'quasar'

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
      wantChecked: []
    }
  },
  watch: {
    country (n) {
      this.location = ''
      if (n === 'CA') this.detailRegion = canada
      else if (n === 'US') this.detailRegion = usa
      else this.detailRegion = []
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
    }
  }
}
</script>
