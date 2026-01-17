<template>
  <div :id="cat" class="col s12">
    <div v-if="!files.length" class="no_files">
      No files in this category found
    </div>

    <div class="download" v-else v-for="file in files" :key="file.id">
      <a
        :href="file.redirectUrl || fileDownloadUrl(file)"
        target="_blank"
        class="btn button"
      >
        <i class="material-icons">
          {{ file.redirectUrl ? "open_in_new" : "file_download" }}
        </i>
      </a>

      <div class="title">{{ file.name }}</div>
      <div class="desc">{{ file.description }}</div>
      <div class="info">Updated at {{ dtRegionalUS(file.updatedAt) }}z</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["cat", "files"],
  methods: {
    fileDownloadUrl(file) {
      return `https://zabartcc.sfo3.digitaloceanspaces.com/downloads/${file.fileName}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.download {
  padding: 1em 1em 0.5em 1em;
  transition: background-color 0.3s ease;

  .title {
    font-weight: 700;
    font-size: 1.3rem;
    width: calc(100% - 45px);
  }

  .desc {
    font-size: 0.9rem;
    width: calc(100% - 45px);
  }

  .button {
    float: right;
    background: $primary-color-light;

    &.btn {
      width: auto;
      padding: 0 0.6em;
      color: #fff;
    }
  }

  .info {
    font-size: 0.8rem;
    margin-top: 5px;
    color: #9e9e9e;
  }

  &:nth-of-type(odd) {
    background: hsla(0, 0%, 94.9%, 0.5);
  }

  &:hover {
    background: #eaeaea;
  }
}

.no_files {
  padding: 1.5em 1em;
  font-style: italic;
}
</style>
