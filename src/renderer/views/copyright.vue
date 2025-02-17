<template>
  <el-row>
    <el-col :offset="2" :span="20" style="text-align: center">
      <el-row>
        <h1>{{ titles.name }}</h1>
        <el-tooltip
          v-if="saveMe > 0"
          :content="`${titles.copyright}注视着你……`"
        >
          <h1>{{ titles.copyright }}</h1>
        </el-tooltip>
        <el-tooltip v-else content="以克苏鲁之名！">
          <h1>旧神方尖碑</h1>
        </el-tooltip>
      </el-row>
      <el-row>
        <h2>Staff</h2>
        <small></small>
        <h4>主催</h4>
        <p>
          <span>阿拉萨德</span>
          <el-divider direction="vertical" />
          <span>仓鼠</span>
        </p>
        <h4>程序</h4>
        <p>
          <span>风之低吟</span>
          <el-divider direction="vertical" />
          <span>ForeverDdB</span>
        </p>
        <h4>录入协助</h4>
        <small>排名不分先后</small>
        <p>
          <span v-for="(staff, i) in staffs" :key="i">
            <el-divider v-if="i % 8" direction="vertical" />
            <br v-else-if="i" />
            <span>{{ staff }}</span>
          </span>
        </p>
        <h4>散篇收录</h4>
        <p>
          <span v-for="(editor, i) in editors" :key="i">
            <el-divider v-if="i % 8" direction="vertical" />
            <br v-else-if="i" />
            <span>{{ editor }}</span>
          </span>
        </p>
        <h4>联络协助</h4>
        <p>
          <span>阿拉萨德</span>
          <el-divider direction="vertical" />
          <span>我是地狱的复仇者——科比布莱恩特</span>
        </p>
        <h2>今日，我等宣布项目解散！</h2>
      </el-row>
      <el-divider />
      <el-row>
        <h2>其他译者/作者</h2>
        <small>NGA论坛ID，按字母/笔画顺序，排名不分先后</small>
        <el-tooltip content="找不到您的名字？请联系@阿拉萨德">
          <p>
            <span v-for="(creator, i) in creators" :key="i">
              <el-divider v-if="i % 8" direction="vertical" />
              <br v-else-if="i" />
              <span>{{ creator }}</span>
            </span>
          </p>
        </el-tooltip>
        <strong>
          感谢在上方名单中所有参与翻译创作的大家，以及，浏览该页面的您
        </strong>
        <p>
          <small>
            <el-link
              href="https://bbs.nga.cn/read.php?tid=38898512"
              style="font-size: inherit"
              target="_blank"
              type="primary"
            >
              我有作品想被收录/我不想被收录/我有其他问题？点击这里
            </el-link>
          </small>
        </p>
      </el-row>
      <el-divider />
      <el-row>
        <el-descriptions
          :column="4"
          border
          size="small"
          title="本项目依赖于（按重要性排序）"
        >
          <el-descriptions-item label="vue-electron-prisma-test">
            <el-link
              href="https://github.com/clementvp/vue-electron-prisma-test"
              style="font-size: inherit"
              target="_blank"
              type="primary"
            >
              16 Feb 2021
            </el-link>
          </el-descriptions-item>
          <el-descriptions-item label="electron">19.0.11</el-descriptions-item>
          <el-descriptions-item label="vue">2.7.8</el-descriptions-item>
          <el-descriptions-item label="vue-router">3.5.4</el-descriptions-item>
          <el-descriptions-item label="vue-quill-editor">
            3.0.6
          </el-descriptions-item>
          <el-descriptions-item label="element-ui">2.15.9</el-descriptions-item>
          <el-descriptions-item label="prisma">
            3.15.2
          </el-descriptions-item>
          <el-descriptions-item label="sqlite3">3.37.0</el-descriptions-item>
          <el-descriptions-item label="webpack">4.46.0</el-descriptions-item>
          <el-descriptions-item label="jshashes">1.0.8</el-descriptions-item>
          <el-descriptions-item label="sm-crypto">
            0.3.8
          </el-descriptions-item>
        </el-descriptions>
      </el-row>
      <el-row v-if="saveMe > 0">
        <el-divider />
        <el-col :offset="8" :span="8">
          <el-input
            v-if="failure > 2"
            v-model="password"
            disabled
            placeholder="枯树洞已不会回应你……"
          />
          <div v-else>
            <el-input
              v-model="password"
              placeholder="枯树洞似乎正盯着你……"
              style="width: 100%"
            >
              <template #prepend>
                <el-tooltip content="下次打开自动进入枯树洞">
                  <el-checkbox v-model="savePassword" />
                </el-tooltip>
              </template>
              <template #append>
                <el-button @click="jump">
                  爱丽丝
                  {{ failure ? new Array(failure + 1).join('！') : '？' }}
                </el-button>
              </template>
            </el-input>
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import connector from '@/renderer/utils/connector';
import EmbeddedData from '@/renderer/utils/data';

export default {
  async created() {
    this.creators = (await connector.get('copyright', {})).filter(
      x => this.editors.indexOf(x) === -1 && this.staffs.indexOf(x) === -1,
    );
  },
  data() {
    return {
      creators: [],
      editors: EmbeddedData.editors,
      failure: 0,
      password: '',
      savePassword: false,
      staffs: EmbeddedData.staffs,
    };
  },
  emits: ['is-safe'],
  methods: {
    async jump() {
      if (this.password === (await connector.get('getPwd', {}))) {
        connector.get('isSafe', this.savePassword).then();
        this.$notify({
          message: '',
          title: '格林……是你吗？',
          type: 'warning',
        });
        this.$emit('is-safe');
        await this.$router.push('/empty');
      } else {
        this.$notify({
          message: '',
          title: '退下，无礼者！',
          type: 'error',
        });
        if (++this.failure > 2) {
          this.password = '';
        }
      }
    },
  },
  name: 'copyright',
  props: ['saveMe', 'titles'],
};
</script>

<style scoped></style>
