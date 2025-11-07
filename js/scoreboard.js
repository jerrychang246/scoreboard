// 记分牌功能实现
// 存储当前分数
let scoreA = 0;
let scoreB = 0;

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    // 监听输入框变化，实时更新显示的名字
    const playerAInput = document.getElementById('playerA');
    const playerBInput = document.getElementById('playerB');
    
    if (playerAInput) {
        playerAInput.addEventListener('input', function() {
            updatePlayerName('A', this.value || '选手A');
        });
    }
    
    if (playerBInput) {
        playerBInput.addEventListener('input', function() {
            updatePlayerName('B', this.value || '选手B');
        });
    }
    
    // 初始化显示
    updateDisplay();
});

/**
 * 更新选手名字显示
 * @param {string} player - 选手标识 ('A' 或 'B')
 * @param {string} name - 选手名字
 */
function updatePlayerName(player, name) {
    const nameElement = document.getElementById('name' + player);
    if (nameElement) {
        nameElement.textContent = name || (player === 'A' ? '选手A' : '选手B');
    }
}

/**
 * 改变分数
 * @param {string} player - 选手标识 ('A' 或 'B')
 * @param {number} change - 分数变化量（正数为加分，负数为减分）
 */
function changeScore(player, change) {
    try {
        if (player === 'A') {
            scoreA = Math.max(0, scoreA + change); // 确保分数不为负数
        } else if (player === 'B') {
            scoreB = Math.max(0, scoreB + change); // 确保分数不为负数
        }
        updateDisplay();
    } catch (error) {
        console.error('改变分数时出错:', error);
        showMessage('操作失败，请刷新页面重试', 'error');
    }
}

/**
 * 更新显示
 */
function updateDisplay() {
    try {
        const scoreAElement = document.getElementById('scoreA');
        const scoreBElement = document.getElementById('scoreB');
        
        if (scoreAElement) {
            scoreAElement.textContent = scoreA;
        }
        if (scoreBElement) {
            scoreBElement.textContent = scoreB;
        }
    } catch (error) {
        console.error('更新显示时出错:', error);
    }
}

/**
 * 重置分数
 */
function resetScore() {
    try {
        if (confirm('确定要重置分数吗？')) {
            scoreA = 0;
            scoreB = 0;
            updateDisplay();
            showMessage('分数已重置', 'success');
        }
    } catch (error) {
        console.error('重置分数时出错:', error);
        showMessage('重置失败，请刷新页面重试', 'error');
    }
}

/**
 * 保存比赛记录
 */
function saveMatch() {
    try {
        // 获取选手名字
        const playerAInput = document.getElementById('playerA');
        const playerBInput = document.getElementById('playerB');
        const playerAName = playerAInput ? (playerAInput.value.trim() || '选手A') : '选手A';
        const playerBName = playerBInput ? (playerBInput.value.trim() || '选手B') : '选手B';
        
        // 验证是否有分数
        if (scoreA === 0 && scoreB === 0) {
            showMessage('请先进行记分再保存', 'error');
            return;
        }
        
        // 判断获胜者
        let winner = '';
        if (scoreA > scoreB) {
            winner = playerAName;
        } else if (scoreB > scoreA) {
            winner = playerBName;
        } else {
            winner = '平局';
        }
        
        // 创建比赛记录对象
        const matchRecord = {
            id: Date.now(), // 使用时间戳作为唯一ID
            playerA: playerAName,
            scoreA: scoreA,
            playerB: playerBName,
            scoreB: scoreB,
            winner: winner,
            time: new Date().toLocaleString('zh-CN') // 格式化的时间字符串
        };
        
        // 从localStorage获取已有记录
        let matchHistory = [];
        try {
            const stored = localStorage.getItem('pingpongMatches');
            if (stored) {
                matchHistory = JSON.parse(stored);
            }
        } catch (error) {
            console.error('读取历史记录时出错:', error);
            matchHistory = [];
        }
        
        // 添加新记录到数组开头（最新的在前面）
        matchHistory.unshift(matchRecord);
        
        // 保存到localStorage
        try {
            localStorage.setItem('pingpongMatches', JSON.stringify(matchHistory));
            showMessage('比赛记录已保存！', 'success');
            
            // 可选：保存后重置分数
            // resetScore();
        } catch (error) {
            console.error('保存记录时出错:', error);
            showMessage('保存失败，可能是存储空间不足', 'error');
        }
    } catch (error) {
        console.error('保存比赛时出错:', error);
        showMessage('保存失败，请刷新页面重试', 'error');
    }
}

/**
 * 显示提示信息
 * @param {string} text - 提示文本
 * @param {string} type - 信息类型 ('success' 或 'error')
 */
function showMessage(text, type) {
    try {
        const messageElement = document.getElementById('message');
        if (messageElement) {
            messageElement.textContent = text;
            messageElement.className = 'message ' + type;
            
            // 3秒后自动隐藏
            setTimeout(function() {
                messageElement.className = 'message';
                messageElement.textContent = '';
            }, 3000);
        }
    } catch (error) {
        console.error('显示消息时出错:', error);
    }
}

/**
 * 跳转到历史记录页面
 */
function viewHistory() {
    try {
        window.location.href = 'history.html';
    } catch (error) {
        console.error('跳转页面时出错:', error);
        showMessage('无法打开历史记录页面', 'error');
    }
}

