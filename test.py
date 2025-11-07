# 导入Excel文件
import pandas as pd
import os  # 添加os模块

# 获取当前文件的绝对路径
current_file_path = os.path.abspath(__file__)
print(f"当前文件的绝对路径: {current_file_path}")

# 读取Excel文件
df = pd.read_excel('ABAKeywordTrend-US-20241203.xlsx')

# 打印数据
print(df)

# 找到Excel文件中的“点击集中度”一列,把单元格内容中合计后面的百分比提取出来,到另一列“前三点击百分比”中
df['前三点击百分比'] = df['点击集中度'].str.extract(r'合计:\s*(\d+\.\d+)%')[0]

# 找到Excel文件中的“转化集中度”一列，把单元格内容中合计后面的百分比提取出来,到另一列“前三转化百分比”中
df['前三转化百分比'] = df['转化集中度'].str.extract(r'合计:\s*(\d+\.\d+)%')[0]

# 在处理前5ASIN之前添加这行代码来检查原始数据
print("前10ASIN列的内容示例：")
print(df['前10ASIN'].head())

# 修改提取前5ASIN的代码
df['前5ASIN'] = df['前10ASIN'].apply(lambda x: '\n'.join(x.split(',')[:5]) if pd.notna(x) else '')

# 筛选出表格中第一列“关键词”单���个数大于等于3个的单元格
df = df[df['关键词'].str.split().str.len() >= 3]
# 打印数据
print(df)
# 输出更新后的Excel文件
df.to_excel('ABAKeywordTrend-US-20241203-updated.xlsx', index=False)
