<template>
    <div>
    <div class="container" height="200">
      <div class="main">
        <router-link :to="{path:'section'}">
          <div class="project-name">
            <div class="project-title project-title-home">
              课程体系
            </div>
          </div>
        </router-link>
        <div>
            <!-- target="_blank" -->
              <div class="project-new">
                <div class="project-img">
                  <img src="@/assets/add.png" alt="">
                </div>
                <div class="project-new-title">
                  新建项目
                </div>
              </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script>

export default {
  name: 'home',
  data (){
    return{
      isProject: false,
      currentUser: ''
    }
  }
}
</script>
<style lang="scss" scoped>
    * {
      font-family: "lucida grande", "lucida sans unicode", lucida, helvetica, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    }

    html, body {
      background-color: #F5F5F5;
    }

    #app {
      width: 100%;
      height: 100%;
      background-color: #F5F5F5;
      min-width: 540px;
    }

    .header-container {
      display: flex;
      width: 100%;
      height: 80px;
      justify-content: space-between;
      background-color: #fff;
    }

    .logo-nav {
      width: 80%;
      height: 44px;
      line-height: 44px;
      margin: 0 auto;
      padding: 18px 32px;
      font-size: 14px;
      background-color: #fff;
    }

    .logo-nav>div {
      float: left;
    }

    .embark-logo {
      cursor: pointer;
      padding-left: 72px;
      position: relative;
      font-size: 16px;
      color: #4E4E4E;
      letter-spacing: 0;
      font-family: 'SourceHanSansCN-Bold';
    }

    .embark-logo img {
      position: absolute;
      top: 0;
      left: 0px;
      width: 44px;
      height: 44px;
    }

    .userInfo {
      font-weight: 500;
    }

    .logo-nav .userInfo {
      float: right;
      margin-right: 0;
      position: relative;
      cursor: pointer;
    }

    .logo-nav .teacher-entry {
      float: right;
      margin-right: 30px;
      cursor: pointer;
      display: none;
    }

    .teacher-entry:hover {
      color: rgba(45, 144, 255, 1);
    }

    .logo-nav .teacherEntryShow {
      display: block;
    }

    .userInfo {
      position: relative;
    }

    .userInfo img {
      position: absolute;
      width: 20px;
      height: 20px;
      right: -23px;
      top: 12px;
    }

    .userInfo>span {
      position: absolute;
      width: 100px;
      height: 50px;
      line-height: 50px;
      display: none;
      background-color: #fff;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.17);
      border: 1px solid #ccc;
      border-radius: 4px;
      text-align: center;
      right: -30px;
    }

    .userInfo div:hover {
      color: rgba(45, 144, 255, 1);
    }

    .userInfo:hover span {
      display: block;
    }

    .userInfo span:hover {
      color: rgba(45, 144, 255, 1);
    }

    .container {
      display: flex;
      /* width: 1440px; */
      margin: 0 auto;
    }

    .main {
      width: 1040px;
      margin: 70px auto 140px;
      overflow: hidden;
    }

    .project-name {
      float: left;
      width: 242px;
      height: 270px;
      margin: 8px 8px;
      background-color: #fff;
      box-sizing: border-box;
      padding: 30px;
      cursor: pointer;
    }

    .project-name:hover {
      box-shadow: 0 17px 10px -10px rgba(0, 0, 0, 0.13);
    }

    .project-name div:first-child {
      /* color: #aaa; */
    }

    .project-title {
      /* font-family: SourceHanSansCN-Bold; */
      font-weight: 600;
      font-size: 24px;
      line-height: 40px;
      color: #4E4E4E;
      text-align: center;
      letter-spacing: 0.2px;
      margin-bottom: 20px;
    }

    .project-title.project-title-home > div {
      line-height: 270px;
      color: #4e4e4e;
    }
    .project-new {
      float: left;
      width: 242px;
      height: 270px;
      margin: 8px 8px;
      box-sizing: border-box;
      padding: 30px;
      cursor: pointer;
      border: 3px dotted #E4E9EC;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .project-new .project-img{
      width: 36px;
      height: 36px;
    }
    .project-new .project-img img{
      width: 36px;
      height: 36px;
    }
    .project-new-title {
      font-family: SourceHanSansCN-Bold;
      font-weight: 500;
      font-size: 18px;
      line-height: 27px;
      color: #B4BFC6;
      text-align: center;
      letter-spacing: 0.2px;
    }
    /* .project-time {
      font-family: SourceHanSansCN-Normal;
      font-size: 12px;
      line-height: 24px;
      color: #A0A0A0;
      letter-spacing: 0.1px;
    } */

    a {
      text-decoration: none;
      color: #000;
    }
  </style>
</style>
