<template>
  <div>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field v-model="lineId" label="LINE-ID" readonly>{{
          lineId
        }}</v-text-field>
        <v-text-field v-model="formData.name" label="お名前"></v-text-field>
        <v-text-field
          v-model="formData.tell"
          label="電話番号"
        ></v-text-field> </v-col
    ></v-row>

    <v-btn color="primary" @click="onSubmit()"> 送信する </v-btn>
   
  </div>
</template>

<script>
import firebase from "@/plugins/firebase";
export default {
  data() {
    return {
      formData: {
        name: "",
        tell: "",
      },
      lineId: null,
    };
  },
  mounted() {
    if (!this.canUseLIFF()) {
      return;
    }

    window.liff.init((data) => {
      this.lineId = data.context.userId || null;
    });
  },
  methods: {
    onSubmit() {
      const db = firebase.firestore();
      let dbUsers = db.collection("users");
      dbUsers.add({
        name: this.formData.name,
        tell: this.formData.tell,
        LINEID: this.lineId,
      });

      window.liff
        .sendMessages([
          {
            type: "text",
            text: `お名前：\n${this.formData.name}`,
          },
          {
            type: "text",
            text: `電話番号：\n${this.formData.tell}`,
          },
          {
            type: "text",
            text: "送信が完了しました",
          },
        ])
        .then(() => {
          window.liff.closeWindow();
        })
        .catch((e) => {
          window.alert("Error sending message: " + e);
        });
    },
    handleCancel() {
      if (!this.canUseLIFF()) {
        return;
      }
      window.liff.closeWindow();
    },
    canUseLIFF() {
      return navigator.userAgent.indexOf("Line") !== -1 && window.liff;
    },
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
}

.line-id {
  margin-bottom: 30px;
}

.form > * {
  margin-bottom: 10px;
}
</style>