// 历史记录页面功能实现

/**
 * 页面加载时显示历史记录
 */
document.addEventListener('DOMContentLoaded', function() {
    try {
        loadMatchHistory();
    } catch (error) {
        console.error('加载历史记录时出错:', error);
        showError('加载历史记录失败，请刷新页面重试');
    }
});

/**
 * 加载并显示比赛历史记录
 */
function loadMatchHistory() {
    try {
        // 从localStorage获取记录
        const stored = localStorage.getItem('pingpongMatches');
        let matchHistory = [];
        
        if (stored) {
            try {
                matchHistory = JSON.parse(stored);
            } catch (error) {
                console.error('解析历史记录时出错:', error);
                matchHistory = [];
            }
        }
        
        const matchListElement = document.getElementById('matchList');
        const emptyMessageElement = document.getElementById('emptyMessage');
        
        if (!matchListElement) {
            console.error('找不到matchList元素');
            return;
        }
        
        // 如果没有记录，显示空消息
        if (matchHistory.length === 0) {
            if (matchListElement) {
                matchListElement.innerHTML = '';
            }
            if (emptyMessageElement) {
                emptyMessageElement.style.display = 'block';
            }
            return;
        }
        
        // 隐藏空消息
        if (emptyMessageElement) {
            emptyMessageElement.style.display = 'none';
        }
        
        // 生成HTML
        let html = '';
        matchHistory.forEach(function(match) {
            html += createMatchItemHTML(match);
        });
        
        matchListElement.innerHTML = html;
        
        // 为所有删除按钮绑定事件
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                const matchId = this.getAttribute('data-id');
                if (matchId) {
                    deleteMatch(parseInt(matchId));
                }
            });
        });
    } catch (error) {
        console.error('加载历史记录时出错:', error);
        showError('加载历史记录失败，请刷新页面重试');
    }
}

/**
 * 创建单个比赛记录的HTML
 * @param {Object} match - 比赛记录对象
 * @returns {string} HTML字符串
 */
function createMatchItemHTML(match) {
    try {
        const winnerClass = match.winner === '平局' ? '' : 'match-winner';
        const winnerText = match.winner === '平局' ? '平局' : `🏆 获胜者: ${match.winner}`;
        
        return `
            <div class="match-item">
                <div class="match-header">
                    <div class="match-time">📅 ${match.time || '未知时间'}</div>
                    <button class="delete-btn" data-id="${match.id}">删除</button>
                </div>
                <div class="match-details">
                    <div class="player-info">
                        <div class="name">${escapeHtml(match.playerA || '选手A')}</div>
                        <div class="score">${match.scoreA || 0}</div>
                    </div>
                    <div style="text-align: center; font-size: 1.5em; font-weight: bold; color: #667eea;">VS</div>
                    <div class="player-info">
                        <div class="name">${escapeHtml(match.playerB || '选手B')}</div>
                        <div class="score">${match.scoreB || 0}</div>
                    </div>
                </div>
                <div class="${winnerClass}">
                    ${escapeHtml(winnerText)}
                </div>
            </div>
        `;
    } catch (error) {
        console.error('创建比赛记录HTML时出错:', error);
        return '';
    }
}

/**
 * 删除比赛记录
 * @param {number} matchId - 比赛记录ID
 */
function deleteMatch(matchId) {
    try {
        if (!confirm('确定要删除这条比赛记录吗？')) {
            return;
        }
        
        // 从localStorage获取记录
        const stored = localStorage.getItem('pingpongMatches');
        let matchHistory = [];
        
        if (stored) {
            try {
                matchHistory = JSON.parse(stored);
            } catch (error) {
                console.error('解析历史记录时出错:', error);
                matchHistory = [];
            }
        }
        
        // 过滤掉要删除的记录
        matchHistory = matchHistory.filter(function(match) {
            return match.id !== matchId;
        });
        
        // 保存回localStorage
        try {
            localStorage.setItem('pingpongMatches', JSON.stringify(matchHistory));
            // 重新加载显示
            loadMatchHistory();
        } catch (error) {
            console.error('保存记录时出错:', error);
            showError('删除失败，可能是存储空间问题');
        }
    } catch (error) {
        console.error('删除比赛记录时出错:', error);
        showError('删除失败，请刷新页面重试');
    }
}

/**
 * HTML转义，防止XSS攻击
 * @param {string} text - 要转义的文本
 * @returns {string} 转义后的文本
 */
function escapeHtml(text) {
    if (typeof text !== 'string') {
        return String(text);
    }
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * 显示错误信息
 * @param {string} message - 错误消息
 */
function showError(message) {
    try {
        alert(message); // 简单使用alert，也可以创建更美观的提示
    } catch (error) {
        console.error('显示错误信息时出错:', error);
    }
}

