<template>
    <div class="card">
        <div class="card-content">
            <span class="card-title">Controller Roster</span>
        </div>
        <table class="controller_list striped">
            <thead class="controller_list_head">
                <tr>
                    <th class="name">Controller</th>
                    <th class="certs">Certifications</th>
                </tr>
            </thead>
            <tbody class="controller_list_row">
                <tr v-for="controller in controllers" :key="controller.cid">
                    <td class="name">
                        <router-link :to="`/controllers/${controller.cid}`">
                            {{controller.fname}} {{controller.lname}} ({{controller.oi}})
                        </router-link><br />
                        <div class="rating">
                            {{translateRating(controller.rating)}}
                        </div>
                    </td>
                    <td class="certs">
                        <span v-for="role in controller.roles" :class="`tooltipped cert cert_${role.class}`" :key="role.id" :data-tooltip="role.name">
                            {{role.code.toUpperCase()}}
                        </span>
                        <span v-for="cert in controller.certifications" :class="`cert cert_${cert.class}`" :key="cert.id">
                            {{cert.name}}
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { ControllerMixin } from '@/mixins/ControllerMixin.js';

export default {
    name: 'Controller Roster',
    data() {
        return {
            controllers: []
        };
    },
    mixins: [ControllerMixin],
    mounted() {
        M.Tooltip.init(document.querySelectorAll('.tooltipped'), {
            position: 'bottom',
            margin: 0
        });
        this.getControllers();
    },
    methods: {
        async getControllers() {
            this.controllers = await this.getControllersMixin();
        },
        translateRating(value) {
            if(!value) return 'Unknown';
            var ratings = ['Unknown', 'Observer', 'Student 1', 'Student 2', 'Student 3', 'Controller 1', 'Controller 2', 'Controller 3', 'Instructor 1', 'Instructor 2', 'Instructor 3', 'Supervisor', 'Administrator'];
            return ratings[value];
        }
    }
}
</script>

<style scoped lang="scss">
.controller_list {
    padding: 10px;
}
.controller_list_head {
	position: relative;
	font-weight: 700;
	border-bottom: 1px solid #666;
}

.controller_list_row div {
	padding: 0.5rem 1rem;
}

.controller_list_row tr {
    transition: background-color 0.3s ease;

    &:nth-child(odd) {
        background-color: rgba(242,242,242,0.6)!important;
    }
    &:hover {
        background-color: rgba(242,242,242,0.6);
    }
}

tr th {
    text-align: left!important;
}

td {
    padding: .5em 5px!important;
}

.name {
    width: 30%;
}

.name a {
    font-weight: 700;
}

.name .rating {
    color: gray;
    font-weight: 300;
    margin: -10px 0 0 -15px;
    padding-bottom: 0!important;
}

.cert {
	display: inline-block;
    padding: 0.25rem 0.4rem;
    color: #fff;
    font-size: 0.85rem;
    margin: 2px;

    &.cert_senior {
		background: $cert_senior;
	}

	&.cert_junior {
		background: $cert_junior;
	}

	&.cert_training {
		background: $cert_training;
    }
    
    &.cert_center {
        background-color: $secondary-color-dark;
    }

    &.cert_major {
        background: $secondary-color;
    }

    &.cert_minor {
        background: $secondary-color-light;
    }
}

.tooltipped {
    cursor: pointer;
}
</style>