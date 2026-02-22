export const pythonCode = `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import TensorDataset, DataLoader
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import math
import os

# Set random seed for reproducibility
np.random.seed(42)
torch.manual_seed(42)
if torch.cuda.is_available():
    torch.cuda.manual_seed(42)

# Configuration
FILE_PATH = 'PEMS-BAY (1).csv'
SEQ_LENGTH = 12
BATCH_SIZE = 64
EPOCHS = 30
LEARNING_RATE = 0.001
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

def load_and_enrich_data(filepath):
    """
    Loads data, cleans noise, and adds rich temporal embeddings.
    """
    if not os.path.exists(filepath):
        return None, None

    df = pd.read_csv(filepath, index_col=0, parse_dates=True)
    df.sort_index(inplace=True)
    df = df.astype('float32')
    sensor_cols = df.columns.tolist()

    # --- DATA CLEANING ---
    df[sensor_cols] = df[sensor_cols].replace(0.0, np.nan)
    df[sensor_cols] = df[sensor_cols].interpolate(method='linear', limit_direction='both')
    df[sensor_cols] = df[sensor_cols].ffill().bfill()

    # --- ADVANCED FEATURE ENGINEERING ---
    hour = df.index.hour + df.index.minute / 60.0
    day_of_week = df.index.dayofweek

    time_features = pd.DataFrame(index=df.index)
    time_features['sin_hour'] = np.sin(2 * np.pi * hour / 24.0)
    time_features['cos_hour'] = np.cos(2 * np.pi * hour / 24.0)
    time_features['sin_day'] = np.sin(2 * np.pi * day_of_week / 7.0)
    time_features['cos_day'] = np.cos(2 * np.pi * day_of_week / 7.0)

    df = pd.concat([df, time_features], axis=1)
    return df, sensor_cols

def create_sequences(input_data, target_data, seq_length):
    """
    Creates sliding window sequences efficiently.
    """
    xs, ys = [], []
    total_len = len(input_data)

    for i in range(total_len - seq_length):
        x = input_data[i:(i + seq_length)]
        y = target_data[i + seq_length]
        xs.append(x)
        ys.append(y)

    return np.array(xs), np.array(ys)

class HybridTrafficModel(nn.Module):
    def __init__(self, num_input_features, num_output_sensors, seq_length):
        super(HybridTrafficModel, self).__init__()

        # --- Local Trend Extraction (CNN) ---
        self.conv1 = nn.Conv1d(in_channels=num_input_features, out_channels=64, kernel_size=3, padding=1)
        self.bn1 = nn.BatchNorm1d(64)
        self.relu = nn.ReLU()

        # --- Temporal Dynamics (GRU) ---
        self.gru1 = nn.GRU(input_size=64, hidden_size=128, batch_first=True)
        self.dropout1 = nn.Dropout(0.2)
        self.gru2 = nn.GRU(input_size=128, hidden_size=64, batch_first=True)
        self.bn2 = nn.BatchNorm1d(64)
        self.dropout2 = nn.Dropout(0.2)

        # --- Prediction Head ---
        self.fc1 = nn.Linear(64, 64)
        self.fc_out = nn.Linear(64, num_output_sensors)

    def forward(self, x):
        # 1. CNN Layer
        x = x.permute(0, 2, 1)
        x = self.conv1(x)
        x = self.bn1(x)
        x = self.relu(x)
        x = x.permute(0, 2, 1)

        # 2. GRU Layers
        x, _ = self.gru1(x)
        x = self.dropout1(x)
        x, _ = self.gru2(x)
        x = x[:, -1, :]
        x = self.bn2(x)
        x = self.dropout2(x)

        # 3. Dense Layers
        x = self.relu(self.fc1(x))
        x = self.fc_out(x)
        return x

# ... Initializing data & DataLoaders ...

    for epoch in range(EPOCHS):
        # Train
        model.train()
        train_losses = []
        for batch_x, batch_y in train_loader:
            batch_x, batch_y = batch_x.to(DEVICE), batch_y.to(DEVICE)

            optimizer.zero_grad()
            outputs = model(batch_x)
            loss = criterion(outputs, batch_y)
            loss.backward()
            optimizer.step()
            train_losses.append(loss.item())

        avg_train_loss = np.mean(train_losses)

        # Validation
        model.eval()
        val_losses = []
        with torch.no_grad():
            for batch_x, batch_y in val_loader:
                batch_x, batch_y = batch_x.to(DEVICE), batch_y.to(DEVICE)
                outputs = model(batch_x)
                loss = criterion(outputs, batch_y)
                val_losses.append(loss.item())

        avg_val_loss = np.mean(val_losses)

        scheduler.step(avg_val_loss)
        early_stopper(avg_val_loss, model)

        if early_stopper.early_stop:
            print("Early stopping triggered")
            model.load_state_dict(early_stopper.best_model_state)
            break

# ... Results & Visualizations ...
`;

export const STEPS = [
    {
        id: 0,
        title: "Predicting the Future of Traffic",
        type: "hero",
        lines: [1, 28] // imports & config
    },
    {
        id: 1,
        title: "1. Libraries & Setup",
        type: "libraries",
        lines: [1, 12]
    },
    {
        id: 2,
        title: "2. Setting the Rules (Config)",
        type: "config",
        lines: [14, 28]
    },
    {
        id: 3,
        title: "3. Data Prep & Time Travel",
        type: "data_prep",
        lines: [30, 57] // load_and_enrich_data
    },
    {
        id: 4,
        title: "4. Sliding Window Concept",
        type: "sliding_window",
        lines: [59, 73] // create_sequences
    },
    {
        id: 5,
        title: "5. The Brain (CNN + GRU)",
        type: "architecture",
        lines: [75, 117] // HybridTrafficModel
    },
    {
        id: 6,
        title: "6. The Training Loop",
        type: "training",
        lines: [121, 159] // for epoch
    }
];
