<template>
  <div class="card">
    <div class="card-content">
      <div class="card-title">All Picked-Up Training Sessions</div>
    </div>
    <div v-if="!sessions" class="loading_container">
      <Spinner />
    </div>
    <div v-else-if="!sessions.length" class="no_sessions">
      There are no picked-up training sessions.
    </div>
    <div class="sessions_wrapper" v-else>
      <table class="sessions_list striped">
        <thead class="sessions_list_head">
        <tr>
          <th>Student</th>
          <th>Milestone</th>
          <th>Instructor</th>
          <th>Start</th>
          <th>End</th>
        </tr>
        </thead>
        <tbody class="sessions_list_row">
        <tr v-for="(session) in sessions" :key="session._id">
          <td>{{ session.student ? session.student.fname + ' ' + session.student.lname : 'No student assigned' }}</td>
          <td>{{ session.milestone?.name }}</td>
          <td>{{ session.instructor ? session.instructor.fname + ' ' + session.instructor.lname : 'No instructor assigned' }}</td>
          <td>{{ formatDateTime(session.startTime) }}</td>
          <td>{{ formatDateTime(session.endTime) }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { zabApi } from '@/helpers/axios.js';

export default {
  name: 'PickedUpSessions',
  data() {
    return {
      sessions: null
    };
  },
  async mounted() {
    await this.fetchPickedUpSessions();
  },
  methods: {
    async fetchPickedUpSessions() {
      try {
        const { data } = await zabApi.get(`/training/session/picked-up`);
        this.sessions = data.data;
      } catch (e) {
        console.error(e);
      }
    },
    formatDateTime(value) {
      const d = new Date(value);
      return d.toLocaleString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        timeZone: 'UTC', hour12: false
      });
    }
  }
};
</script>

<style scoped>
.no_sessions {
  font-style: italic;
  margin-top: -1em;
  padding: 0 1em 1em 1em;
}
</style>