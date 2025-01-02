<template>
  <div class="game-container">
    <!-- 顶部按钮组 -->
    <div class="header-buttons">
      <nut-button type="primary" @click="showAddDialog">添加玩家</nut-button>
      <nut-button type="danger" @click="deletePlayer">删除玩家</nut-button>
      <nut-button type="danger" @click="calculateResult">计算结果</nut-button>
      <nut-button type="warning" @click="resetData">重置数据</nut-button>
    </div>

    <!-- 玩家列表 -->
    <div class="player-grid">
      <div
        v-for="(item, index) in sortArr"
        v-show="index < sortArr.length - 1"
        :key="item.id"
        class="player-item"
      >
        <!-- 排名和玩家选择 -->
        <div class="player-info">
          <span class="rank">第{{ item.index + 1 }}名 </span>
          <nut-button size="small" @click="selectPlayer(item.id)">
            {{ item.name ? item.name : "请选择" }}
          </nut-button>
        </div>

        <!-- 符子和胡牌方式 -->
        <div class="game-info">
          <div class="score-section">
            <span class="label">符子:</span>
            <nut-input-number
              :button-size="30"
              :input-width="40"
              v-model="item.score"
              :step="1"
              :min="1"
              :max="24"
            />
          </div>

          <div class="win-type">
            <nut-radio-group
              v-model="item.isZiMo"
              @change="handleZiMoChange(item)"
            >
              <nut-radio :label="true">自摸</nut-radio>
              <nut-radio :label="false">被放炮</nut-radio>
            </nut-radio-group>
            <span v-if="!item.isZiMo" class="fangpao-name">
              {{
                item.fangPaoName ? `放炮: ${item.fangPaoName}` : "未选择放炮"
              }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <nut-dialog
      v-model:visible="dialogVisible"
      title="添加玩家"
      @ok="addPlayer"
      @cancel="dialogVisible = false"
      class="custom-dialog"
    >
      <nut-input
        v-model="newPlayerName"
        placeholder="请输入玩家名称"
        required
        :error="inputError"
        :error-message="errorMessage"
        @input="clearError"
      />
    </nut-dialog>

    <nut-dialog
      v-model:visible="deleteDialogVisible"
      title="删除玩家"
      @ok="confirmDelete"
      @cancel="deleteDialogVisible = false"
      class="custom-dialog"
    >
      <nut-radio-group v-model="selectedPlayerId">
        <nut-radio v-for="item in initPlayer" :key="item.id" :label="item.id">
          {{ item.name }}
        </nut-radio>
      </nut-radio-group>
    </nut-dialog>

    <nut-dialog
      v-model:visible="selectDialogVisible"
      title="选择玩家"
      :footer="false"
      @cancel="selectDialogVisible = false"
      class="custom-dialog"
    >
      <nut-radio-group v-model="selectedPlayerId" @change="onPlayerSelect">
        <nut-radio
          v-for="item in initPlayer"
          :key="item.id"
          :label="item.id"
          :disabled="isPlayerSelected(item.id)"
        >
          {{ item.name }}
        </nut-radio>
      </nut-radio-group>
    </nut-dialog>

    <nut-dialog
      v-model:visible="fangPaoDialogVisible"
      title="选择放炮玩家"
      :footer="false"
      @cancel="fangPaoDialogVisible = false"
      class="custom-dialog"
    >
      <nut-radio-group v-model="selectedFangPaoId" @change="onFangPaoSelect">
        <nut-radio
          v-for="player in initPlayer"
          :key="player.id"
          :label="player.id"
          :disabled="isPlayerDisabledForFangPao(player.id)"
        >
          {{ player.name }}
        </nut-radio>
      </nut-radio-group>
    </nut-dialog>

    <!-- 添加结果弹出层 -->
    <nut-popup
      v-model:visible="showResult"
      position="bottom"
      class="result-popup"
    >
      <div class="popup-header">
        <div class="result-header">计算结果</div>
        <div class="close-icon">
          <CloseLittle @click="showResult = false" />
        </div>
      </div>
      <div class="result-list">
        <div v-for="item in resultList" :key="item.id" class="result-item">
          <div class="result-header-row">
            <div class="result-left">
              <span class="player-name">{{ item.name }}</span>
              <span :class="['score', item.total >= 0 ? 'win' : 'lose']">
                {{ item.total >= 0 ? "+" : "" }}{{ item.total }}
              </span>
            </div>
            <div class="result-tags" v-if="item.order > -1">
              <span class="tag win-type-tag">
                {{ item.isZiMo ? "自摸" : "被放炮" }}
              </span>
              <span class="tag score-tag">{{ item.score }}符</span>
            </div>
          </div>
          <div class="detail">
            <div v-if="item.ziMoScore">
              自摸得分：+{{ item.ziMoScore }}
              <span class="detail-players" v-if="item.ziMoPlayers?.length">
                ({{ item.ziMoPlayers.join("、") }})
              </span>
            </div>
            <div v-if="item.beiFangPaoScore">
              被放炮得分：+{{ item.beiFangPaoScore }}
              <span
                class="detail-players"
                v-if="item.beiFangPaoByPlayers?.length"
              >
                ({{ item.beiFangPaoByPlayers.join("、") }})
              </span>
            </div>
            <div v-if="item.fangPaoScore">
              放炮失分：{{ item.fangPaoScore }}
              <span class="detail-players" v-if="item.fangPaoToPlayers?.length">
                ({{ item.fangPaoToPlayers.join("、") }})
              </span>
            </div>
            <div v-if="item.beiZiMoScore">
              被自摸失分：{{ item.beiZiMoScore }}
              <span class="detail-players" v-if="item.beiZiMoByPlayers?.length">
                ({{ item.beiZiMoByPlayers.join("、") }})
              </span>
            </div>
          </div>
        </div>
      </div>
    </nut-popup>
  </div>
</template>

<script setup lang="ts">
import { useLocalStorage } from "@vueuse/core";
import { showToast } from "@nutui/nutui";
import { CloseLittle } from "@nutui/icons-vue";
interface Player {
  id: number;
  name: string;
  score: number;
}

const initPlayer = useLocalStorage<Player[]>("initPlayer", []);
const sortArr = ref<any[]>([]);
watchEffect(() => {
  sortArr.value = initPlayer.value.map((item, index) => {
    console.log(item.id, index);
    return {
      index: index,
      id: "",
      score: 0,
      name: "",
      fuZi: 0,
      fangPao: "",
      fangPaoName: "",
      isZiMo: true,
    };
  });
});

const dialogVisible = ref(false);
const newPlayerName = ref("");

const inputError = ref(false);
const errorMessage = ref("");

const clearError = () => {
  inputError.value = false;
  errorMessage.value = "";
};

const showAddDialog = () => {
  dialogVisible.value = true;
  newPlayerName.value = "";
};

const addPlayer = () => {
  const newId = Date.now();
  initPlayer.value.push({
    id: newId,
    name: newPlayerName.value.trim(),
    score: 0,
  });
  dialogVisible.value = false;
};

const deleteDialogVisible = ref(false);
const selectedPlayerId = ref<number>();

const deletePlayer = () => {
  if (initPlayer.value.length <= 1) {
    showToast.fail("至少保留一名玩家");
    return;
  }
  deleteDialogVisible.value = true;
  selectedPlayerId.value = undefined;
};

const confirmDelete = () => {
  if (!selectedPlayerId.value) {
    showToast.fail("请选择要删除的玩家");
    return;
  }

  const index = initPlayer.value.findIndex(
    (player) => player.id === selectedPlayerId.value
  );

  if (index !== -1) {
    initPlayer.value.splice(index, 1);
    deleteDialogVisible.value = false;
  }
};

const resetData = () => {
  sortArr.value = initPlayer.value.map((item, index) => {
    console.log(item.id, index);
    return {
      index: index,
      id: "",
      score: 0,
      name: "",
      fuZi: 0,
      fangPao: "",
      fangPaoName: "",
      isZiMo: true,
    };
  });
};

const selectDialogVisible = ref(false);
const currentSelectIndex = ref<number>();

const selectPlayer = (id: string) => {
  selectDialogVisible.value = true;
  currentSelectIndex.value = sortArr.value.findIndex((item) => item.id === id);
};

const onPlayerSelect = () => {
  if (!selectedPlayerId.value || currentSelectIndex.value === undefined) return;

  const selectedPlayer = initPlayer.value.find(
    (player) => player.id === selectedPlayerId.value
  );

  if (selectedPlayer && currentSelectIndex.value !== undefined) {
    sortArr.value[currentSelectIndex.value] = {
      ...sortArr.value[currentSelectIndex.value],
      id: selectedPlayer.id,
      name: selectedPlayer.name,
    };
  }

  selectDialogVisible.value = false;
  selectedPlayerId.value = undefined;
};

const isPlayerSelected = (playerId: number) => {
  return sortArr.value.some(
    (item) =>
      item.id === playerId &&
      currentSelectIndex.value !==
        sortArr.value.findIndex((i) => i.id === playerId)
  );
};

const fangPaoDialogVisible = ref(false);
const selectedFangPaoId = ref<number>();
const currentItem = ref<any>(null);

const selectFangPao = (item: any) => {
  currentItem.value = item;
  fangPaoDialogVisible.value = true;
  selectedFangPaoId.value = item.fangPao || undefined;
};

const onFangPaoSelect = () => {
  if (!selectedFangPaoId.value || !currentItem.value) return;

  const fangPaoPlayer = initPlayer.value.find(
    (player) => player.id === selectedFangPaoId.value
  );

  if (fangPaoPlayer) {
    currentItem.value.fangPao = fangPaoPlayer.id;
    currentItem.value.fangPaoName = fangPaoPlayer.name;
  }

  fangPaoDialogVisible.value = false;
  selectedFangPaoId.value = undefined;
  currentItem.value = null;
};

const handleZiMoChange = (item: any) => {
  if (!item.isZiMo) {
    selectFangPao(item);
  } else {
    item.fangPao = "";
    item.fangPaoName = "";
  }
};

const showResult = ref(false);
const resultList = ref<any[]>([]);

const calculateResult = () => {
  // 初始化结果列表
  resultList.value = initPlayer.value.map((player) => ({
    id: player.id,
    name: player.name,
    ziMoScore: 0,
    beiFangPaoScore: 0,
    beiFangPaoByPlayers: [],
    fangPaoScore: 0,
    beiZiMoScore: 0,
    ziMoPlayers: [],
    beiZiMoByPlayers: [],
    fangPaoToPlayers: [],
    total: 0,
    order: -1,
    isZiMo: false,
    score: 0,
  }));

  // 遍历每个名次计算得分
  sortArr.value.forEach((item, index) => {
    if (!item.id || !item.score) return;
    const score = Number(item.score);
    if (isNaN(score)) return;

    // 记录胡牌顺序
    const resultPlayer = resultList.value.find((p) => p.id === item.id);
    if (resultPlayer) {
      resultPlayer.order = index;
      resultPlayer.isZiMo = item.isZiMo;
      resultPlayer.score = item.score;
    }

    if (item.isZiMo) {
      const ziMoPlayer = resultList.value.find((p) => p.id === item.id);
      if (ziMoPlayer) {
        // 获取未胡牌的玩家列表
        const unfinishedPlayers = initPlayer.value.filter(
          (player) =>
            player.id !== item.id &&
            !sortArr.value.slice(0, index).some((p) => p.id === player.id)
        );

        // 计算得分
        const ziMoScore = score * 2 * unfinishedPlayers.length;
        ziMoPlayer.ziMoScore += ziMoScore;
        ziMoPlayer.total += ziMoScore;

        // 记录被自摸玩家名称
        ziMoPlayer.ziMoPlayers = unfinishedPlayers.map((p) => p.name);

        // 更新被自摸玩家的分数和记录自摸玩家
        resultList.value.forEach((player) => {
          if (unfinishedPlayers.some((p) => p.id === player.id)) {
            const loseScore = score * 2;
            player.beiZiMoScore -= loseScore;
            player.total -= loseScore;
            // 记录是谁自摸的
            if (!player.beiZiMoByPlayers) {
              player.beiZiMoByPlayers = [];
            }
            player.beiZiMoByPlayers.push(ziMoPlayer.name);
          }
        });
      }
    } else if (!item.isZiMo && item.fangPao) {
      const score = Number(item.score);
      const fangPaoId = Number(item.fangPao);
      if (isNaN(fangPaoId) || isNaN(score)) return;

      // 更新胡牌玩家得分
      const winPlayer = resultList.value.find((p) => p.id === item.id);
      const fangPaoPlayer = resultList.value.find((p) => p.id === fangPaoId);

      if (winPlayer && fangPaoPlayer) {
        winPlayer.beiFangPaoScore += score;
        winPlayer.total += score;
        // 记录是谁放的炮
        if (!winPlayer.beiFangPaoByPlayers) {
          winPlayer.beiFangPaoByPlayers = [];
        }
        winPlayer.beiFangPaoByPlayers.push(fangPaoPlayer.name);
      }

      // 更新放炮玩家得分
      if (fangPaoPlayer) {
        fangPaoPlayer.fangPaoScore -= score;
        fangPaoPlayer.total -= score;
        // 记录放炮给谁
        if (!fangPaoPlayer.fangPaoToPlayers) {
          fangPaoPlayer.fangPaoToPlayers = [];
        }
        if (winPlayer) {
          fangPaoPlayer.fangPaoToPlayers.push(winPlayer.name);
        }
      }
    }
  });

  // 按胡牌顺序排序，未胡牌的放最后
  resultList.value.sort((a, b) => {
    if (a.order === -1 && b.order === -1) {
      return 0;
    }
    if (a.order === -1) {
      return 1;
    }
    if (b.order === -1) {
      return -1;
    }
    return a.order - b.order;
  });

  showResult.value = true;
};

const isPlayerDisabledForFangPao = (playerId: number) => {
  if (!currentItem.value) return true;

  if (playerId === currentItem.value.id) return true;

  const currentIndex = currentItem.value.index;

  return sortArr.value.some(
    (item, index) =>
      index < currentIndex && item.id === playerId && item.id !== ""
  );
};
</script>

<style scoped>
.game-container {
  padding: 8px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.header-buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
  padding: 12px 8px;
  background: white;
  border-radius: 8px;
  margin-bottom: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.player-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  padding: 0 4px;
}

.player-item {
  background: white;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.player-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.rank {
  font-size: 12px;
  font-weight: bold;
  color: #666;
  min-width: 45px;
}

.game-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.score-section {
  display: flex;
  align-items: center;
  gap: 4px;
}

.label {
  color: #666;
  font-size: 12px;
  min-width: 36px;
}

.win-type {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.fangpao-name {
  color: #666;
  font-size: 12px;
}

:deep(.nut-radio-group) {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  width: 100%;
}

:deep(.nut-button) {
  font-size: 12px;
  padding: 4px 8px;
  height: auto;
}

:deep(.custom-dialog) {
  width: 280px;

  .nut-dialog__content {
    max-height: 50vh;
    padding: 12px;
  }

  .nut-radio-group {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    width: 100%;
  }

  .nut-radio {
    margin: 0;
    padding: 6px;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .text-gray-400 {
    display: block;
    font-size: 10px;
  }
}

:deep(.nut-dialog) {
  max-width: 90vw;

  .nut-dialog__content {
    overflow-x: hidden;
  }
}

.result-popup {
  max-height: 70vh;
  border-radius: 16px 16px 0 0;
  padding: 16px;
}

.popup-header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
}

.close-icon {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  padding: 8px;
  color: #666;
  cursor: pointer;
}

.result-header {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}

.result-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.result-item {
  background: #f5f5f5;
  padding: 6px 12px;
  border-radius: 8px;
  position: relative;
}

.result-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
}

.result-left {
  display: flex;
  align-items: center;
}

.result-tags {
  display: flex;
  gap: 4px;
}

.tag {
  font-size: 14px;
  padding: 2px 6px;
  border-radius: 4px;
  color: white;
}

.win-type-tag {
  background-color: #2196f3;
}

.score-tag {
  background-color: #ff9800;
}

.player-name {
  font-size: 16px;
  font-weight: bold;
}

.score {
  font-size: 16px;
  margin-left: 12px;
  font-weight: bold;
}

.win {
  color: #4caf50;
}

.lose {
  color: #f44336;
}

.detail {
  margin-top: 4px;
  font-size: 12px;
  color: #666;
}

.detail-players {
  color: #999;
  font-size: 11px;
  margin-left: 4px;
}
</style>
