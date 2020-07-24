<template>
  <div>
  	<!-- Create Columns by gridcolumns sent from parent page -->
    <table class="table ">
	  <thead>
		<tr>
		  <!-- parent page's columns -->
		  <th v-for="col in gridColumns">
		    {{col | capitalize }}
		  </th>
		</tr>
	  </thead>
	  <!-- Data grid -->
	  <tbody>
	    <tr v-for="item in gridData">
	      <td v-for="col in item">
	       <!--{{item[col]}}-->
				 {{col}}
	      </td>
	    </tr>
	  </tbody>
	</table>	  
  </div>
</template>

<script>
  export default {
    data() {
      return {
         msgModify: "Modify",
      }
    },
		props:{
			gridColumns:Array,
			gridData:Array,
		},
  }
</script>
